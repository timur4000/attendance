<?php

namespace App\Models\Admin\Systems\Configurations\Types;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SConfigurationTypes extends Model
{
    use HasFactory;

    protected $table = 's_configuration_types';

    public $timestamps = false;

    protected $fillable =
        [
            'code',
            'description',
        ];
}
