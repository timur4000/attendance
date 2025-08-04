<?php

namespace App\Models\Admin\Systems\AdminMenu;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SAdminPermissionsToAdminMenu extends Model
{
    use HasFactory;

    protected $table = 's_admin_permissions_to_s_admin_menu';

    public $timestamps = false;

    protected $fillable =
        [
            'id_admin_permission',
            'id_admin_menu',
        ];
}
