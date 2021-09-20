<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;

class VoterException extends Exception
{
    /**
     * {@inheritdoc}
     */
    public function getMessageKey()
    {
        return 'Access Denied.';
    }

    /**
     * {@inheritdoc}
     */
    public function getStatusCode()
    {
        return Response::HTTP_FORBIDDEN;
    }

    /**
     * {@inheritdoc}
     */
    public function getHeaders()
    {
        return [];
    }
}
