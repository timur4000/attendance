<?php

namespace App\ApiRequestSettings\Data\Rfid\DetectedRfidTags;

use App\Managers\Date\DateManager;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequests\Classifiers\DetectedRfidTagsIdActionsClassifier;
use App\Standards\ApiRequests\Classifiers\RfidTagsPersonalTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the detected rfid tags api requests.
 */
class DetectedRfidTagsApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdRow')]
    public int $id_row = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    #[RequestKeyAttribute('RfidTag')]
    public string $rfid_tag = '';

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('IdAction')]
    public DetectedRfidTagsIdActionsClassifier $id_action = DetectedRfidTagsIdActionsClassifier::NOT_DEFINED;

    #[RequestKeyAttribute('PersonalTag')]
    public RfidTagsPersonalTypesClassifier $personal_tag = RfidTagsPersonalTypesClassifier::NOT_DEFINED;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::DETECTED_RFID_TAGS;

        $this->date_start = DateManager::datetime();
    }
}
