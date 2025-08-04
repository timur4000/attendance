<?php

namespace App\ApiModels\Rfid\DetectedRfidTags;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\ApiRequests\Classifiers\DetectedRfidTagsIdActionsClassifier;

/**
 * Implements model instance for detected rfid tags response.
 */
class DetectedRfidTagsApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdTag')]
    public int $id_tag;

    #[ApiModelResponseKeyAttribute('CodeAntenna')]
    public DetectedRfidTagsIdActionsClassifier $code_antenna;

    #[ApiModelResponseKeyAttribute('DateEvent')]
    public string $date_event;

    #[ApiModelResponseKeyAttribute('Tag')]
    public string $rfid_tag;

    #[ApiModelResponseKeyAttribute('IdRegType')]
    public int $id_reg_type;

    #[ApiModelResponseKeyAttribute('CodeRegType')]
    public string $code_reg_type;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;
}
