<?php

namespace App\ApiModels\StandardResponse;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\ApiRequests\Classifiers\ApiRequestNumberClassifier;

/**
 * Implements model instance for standard response.
 */
class StandardResponseApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('Number')]
    public int $number;

    #[ApiModelResponseKeyAttribute('IdObject')]
    public int $id_object;

    #[ApiModelResponseKeyAttribute('IdEvent')]
    public int $id_event;

    #[ApiModelResponseKeyAttribute('Message')]
    public string $message;

    #[ApiModelResponseKeyAttribute('Note')]
    public string $note;

    #[ApiModelResponseKeyAttribute('Request')]
    public mixed $request;

    #[ApiModelResponseKeyAttribute('Package')]
    public array $package;

    #[ApiModelResponseKeyAttribute('Comment')]
    public string $comment;

    #[ApiModelResponseKeyAttribute('DateCreate')]
    public string $date_create;

    public function first_package(): array
    {
        return $this->package[0] ?? [];
    }

    public function is_success(): bool
    {
        return $this->number === ApiRequestNumberClassifier::SUCCESS->value;
    }
}
