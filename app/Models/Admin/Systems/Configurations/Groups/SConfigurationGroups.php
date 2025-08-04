<?php

namespace App\Models\Admin\Systems\Configurations\Groups;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SConfigurationGroups extends Model
{
    use HasFactory;

    protected $table = 's_configuration_groups';

    public $timestamps = false;

    protected $fillable =
        [
            'code',
            'description',
        ];
}
