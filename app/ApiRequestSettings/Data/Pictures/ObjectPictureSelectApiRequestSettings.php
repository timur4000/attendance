<?php

namespace App\ApiRequestSettings\Data\Pictures;

use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequests\Classifiers\PictureCodeEntityTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the object picture select api request.
 *
 * @see FoodCardSelectApiRequest
 */
class ObjectPictureSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdObject')]
    public int $id_object = 0;

    #[RequestKeyAttribute('Number')]
    public int $number = 0;

    #[RequestKeyAttribute('GroupNumber')]
    public int $group_number = 0;

    #[RequestKeyAttribute('GroupName')]
    public string $group_name = '';

    #[RequestKeyAttribute('CodeEntity')]
    public PictureCodeEntityTypesClassifier $code_entity = PictureCodeEntityTypesClassifier::FOOD;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::OBJECT_PICTURE_SELECT;
    }
}
