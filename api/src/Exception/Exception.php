<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\Security\Core\Exception\RuntimeException;

class Exception extends RuntimeException implements HttpExceptionInterface
{
    /**
     * {@inheritdoc}
     */
    public function getMessageKey()
    {
        return 'Unhandled error';
    }

    /**
     * {@inheritdoc}
     */
    public function getMessageData()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getStatusCode()
    {
        return Response::HTTP_INTERNAL_SERVER_ERROR;
    }

    /**
     * {@inheritdoc}
     */
    public function getHeaders()
    {
        return [];
    }
}
