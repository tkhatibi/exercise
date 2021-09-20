<?php

namespace App\Security\Voter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Entity\User;
use App\Exception\VoterException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

abstract class AbstractVoter extends Voter
{
    protected $em;

    protected $request;

    protected $security;

    protected ?User $user;

    public function __construct(
        EntityManagerInterface $em,
        RequestStack $requestStack,
        Security $security
    ) {
        $this->em = $em;
        $this->request = $requestStack->getCurrentRequest();
        $this->security = $security;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if ($user instanceof User) {
            $this->user = $user;
        } else {
            return false;
        }

        if ($this->isGrantedRoleAdmin()) {
            return true;
        }

        $this->isGranted($this->getAttribute($attribute), $subject);

        return true;
    }

    protected function getAttribute(string $attribute): string
    {
        return 'route' === $attribute
            ? $this->request->get('_route')
            : $attribute;
    }

    protected function isGrantedRoleAdmin(): bool
    {
        return $this->security->isGranted('ROLE_ADMIN');
    }

    protected function isGrantedRoleSuperAdmin(): bool
    {
        return $this->security->isGranted('ROLE_SUPER_ADMIN');
    }

    protected function hasQuery($query): bool
    {
        return $this->request->query->has($query);
    }

    protected function getParamEntity(
        string $parameterName,
        string $entityName,
        Paginator $paginator = null
    ) {
        if (null === $entityName) {
            return null;
        }
        if ($parameterValue = $this->request->query->get($parameterName)) {
            return $this->em->getRepository($entityName)->find($parameterValue);
        }

        return null;
    }

    protected function getRepository()
    {
        return $this->em->getRepository($this->getEntityName());
    }

    abstract protected function getEntityName(): string;

    abstract protected function isGranted($attribute, $subject);

    protected function assertBeSet($value, VoterException $exception = null)
    {
        $this->assert(null !== $value, $exception);
    }

    protected function assertBeLoggedInUser(
        User $user,
        VoterException $exception = null
    ) {
        $this->assert($this->user->getId() === $user->getId(), $exception);
    }

    protected function assertOneOfItemsBeSet(
        array $items,
        VoterException $exception = null
    ) {
        foreach ($items as $item) {
            if (null !== $item) {
                return;
            }
        }
        $this->assert(false, $exception);
    }

    /**
     * @param Collection|array $collection
     * @param callable         $cb
     * @param bool             $checkAll
     */
    protected function assertHasTrueOnIterate(
        $collection,
        $cb,
        $checkAll = false,
        VoterException $exception = null
    ) {
        if ($checkAll) {
            foreach ($collection as $item) {
                if (!call_user_func($cb, $item)) {
                    $this->assert(false, $exception);
                }
            }
        } else {
            foreach ($collection as $item) {
                if (call_user_func($cb, $item)) {
                    continue;
                }
            }
            $this->assert(false, $exception);
        }
    }

    protected function assert(bool $condition, VoterException $exception = null)
    {
        if (false === $condition) {
            throw $exception ?? new VoterException();
        }
    }
}
