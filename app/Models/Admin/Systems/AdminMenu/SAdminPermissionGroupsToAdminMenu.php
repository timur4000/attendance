<?php

namespace App\Models\Admin\Systems\AdminMenu;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SAdminPermissionGroupsToAdminMenu extends Model
{
    use HasFactory;

    protected $table = 's_admin_permission_groups_to_s_admin_menu';

    public $timestamps = false;

    protected $fillable =
        [
            'id_admin_permission_group',
            'id_admin_menu',
        ];
}
