<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"={"groups"={User::OVERALL}},
 *             "security"="is_granted('route', object)",
 *         },
 *         "post"={
 *             "denormalization_context"={"groups"={User::REGISTER}},
 *             "normalization_context"={"groups"={User::DETAIL}},
 *         },
 *     },
 *     itemOperations={
 *         "get"={
 *             "normalization_context"={"groups"={User::DETAIL}},
 *             "security"="is_granted('route', object)",
 *         },
 *         "put"={
 *             "denormalization_context"={"groups"={User::EDIT}},
 *             "normalization_context"={"groups"={User::DETAIL}},
 *             "security_post_denormalize"="is_granted('route', [previous_object, object])",
 *         },
 *         "patch"={
 *             "denormalization_context"={"groups"={User::EDIT}},
 *             "normalization_context"={"groups"={User::DETAIL}},
 *             "security_post_denormalize"="is_granted('route', [previous_object, object])",
 *         },
 *         "delete"={
 *             "security"="is_granted('route', object)",
 *         },
 *     }
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    const REGISTER = 'UserRegister';
    const EDIT = 'UserEdit';
    const OVERALL = 'UserOverall';
    const DETAIL = 'UserDetail';

    /**
     * @Groups({
     *     User::OVERALL,
     *     User::DETAIL,
     * })
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({
     *     User::REGISTER,
     *     User::OVERALL,
     *     User::DETAIL,
     *     User::EDIT,
     * })
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Groups({
     *     User::REGISTER,
     *     User::OVERALL,
     *     User::DETAIL,
     * })
     * @ORM\Column(type="string", length=255)
     */
    private $username;

    /**
     * @Groups({
     *     User::REGISTER,
     *     User::EDIT,
     * })
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles(): ?array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getUserIdentifier(): ?string
    {
        return $this->username;
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt(): void
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->password = null;
    }
}
