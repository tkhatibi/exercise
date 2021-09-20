<?php

namespace App\Security\Voter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Entity\User;
use App\Repository\UserRepository;

/**
 * @method UserRepository getRepository()
 */
class UserVoter extends AbstractVoter
{
    protected function getEntityName(): string
    {
        return User::class;
    }

    protected function supports($attribute, $subject)
    {
        return strpos($this->getAttribute($attribute), 'api_users_') === 0;
    }

    protected function isGranted(
        $attribute,
        $subject
    ) {
        switch ($attribute) {
            case 'api_users_get_collection':
                $this->checkCollectionGet($subject);
                break;
            case 'api_users_post_collection':
                $this->checkCollectionPost($subject);
                break;
            case 'api_users_delete_item':
                $this->checkItemDelete($subject);
                break;
            case 'api_users_get_item':
                $this->checkItemGet($subject);
                break;
            case 'api_users_put_item':
            case 'api_users_patch_item':
                $this->checkItemEdit($subject[0], $subject[1]);
                break;
            default:
                $this->assert(false);
        }
    }

    protected function checkCollectionGet(?Paginator $paginator) {
        // TODO
    }

    protected function checkCollectionPost(User $user) {
        // TODO
    }

    protected function checkItemGet(User $user) {
        // TODO
    }

    protected function checkItemEdit(User $currentUser, User $nextUser) {
        $this->assert($this->isOwner($currentUser));
    }

    protected function checkItemDelete(User $user) {
        $this->assert($this->isOwner($user));
    }

    protected function isOwner(User $user): bool
    {
        return $user->getId() === $this->user->getId();
    }
}
