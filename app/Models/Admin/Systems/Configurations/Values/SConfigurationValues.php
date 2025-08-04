<?php

namespace App\Models\Admin\Systems\Configurations\Values;

use App\Models\Admin\Systems\Configurations\Groups\SConfigurationGroups;
use App\Models\Admin\Systems\Configurations\Types\SConfigurationTypes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SConfigurationValues extends Model
{
    use HasFactory;

    protected $table = 's_configuration_values';

    public $timestamps = false;

    protected $fillable =
        [
            'id_configuration_group',
            'id_configuration_type',
            'value_integer',
            'value_min',
            'value_max',
            'value_string',
            'code',
            'description',
            'sort_order',
            'is_editable',
            'is_hidden',
        ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(SConfigurationGroups::class, 'id_configuration_group', 'id');
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(SConfigurationTypes::class, 'id_configuration_type', 'id');
    }
}
