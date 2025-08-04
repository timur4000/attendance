<?php

namespace App\ApiModels;

use App\Standards\Abstracts\ApiModels\ApiModel;
use App\Standards\Attributes\ApiModel\ApiModelGetFirstAttribute;
use App\Standards\Attributes\ApiModel\ApiModelResponseKeyAttribute;
use App\Standards\Attributes\ApiModel\ApiModelToArrayAttribute;

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

    #[ApiModelResponseKeyAttribute('Package'), ApiModelGetFirstAttribute, ApiModelToArrayAttribute]
    public array $package;

    #[ApiModelResponseKeyAttribute('Comment')]
    public string $comment;

    #[ApiModelResponseKeyAttribute('DateCreate')]
    public string $date_create;
}
