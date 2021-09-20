<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\Persistence\ObjectManager;
use LogicException;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class EntitySubscriber implements EventSubscriber
{
    protected $request;

    protected $tokenStorage;

    protected $passwordHasher;

    public function __construct(
        RequestStack $request,
        TokenStorageInterface $tokenStorage = null,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->request = $request->getCurrentRequest();
        $this->tokenStorage = $tokenStorage;
        $this->passwordHasher = $passwordHasher;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::postLoad,
            Events::postPersist,
            Events::postRemove,
            Events::postUpdate,
            Events::prePersist,
            Events::preRemove,
            Events::preUpdate,
        ];
    }

    public function postLoad(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::postLoad,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::prePersist,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::postPersist,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function preUpdate(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::preUpdate,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::postUpdate,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function preRemove(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::preRemove,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function postRemove(LifecycleEventArgs $args)
    {
        $this->workOnEntity(
            Events::postRemove,
            $args->getObject(),
            $args->getObjectManager(),
            $this->getCurrentUser(),
        );
    }

    public function getCurrentUser(): ?User
    {
        if (!$this->tokenStorage) {
            throw new LogicException('The SecurityBundle is not registered in your application.');
        }

        if (null === ($token = $this->tokenStorage->getToken())) {
            return null;
        }

        if (!is_object($user = $token->getUser())) {
            // e.g. anonymous authentication
            return null;
        }

        return $user;
    }

    public function workOnEntity(
        string $event,
        object $entity,
        ObjectManager $em,
        User $user = null
    ): void {
        if ($entity instanceof User) {
            if (in_array($event, [Events::prePersist, Events::preUpdate])) {
                if (null !== $password = $entity->getPassword()) {
                    $entity->setPassword(
                        $this->passwordHasher->hashPassword(
                            $entity,
                            $password,
                        ),
                    );
                }
            }
        }
    }
}
