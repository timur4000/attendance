<?php

namespace App\Models\Admin\Systems\AdminRoles;

use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Handlers\Admin\Classifiers\RolesClassifierHandler;
use App\Models\Admin\Systems\AdminPermissionGroups\SAdminPermissionGroups;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SAdminPermissionGroupsToApiRoles extends Model
{
    use HasFactory;

    protected $fillable =
        [
            'description',
            'id_admin_permission_group',
            'id_role',
        ];

    protected $appends =
        [
            'role',
        ];

    public function admin_permission_group(): HasOne
    {
        return $this
            ->hasOne(SAdminPermissionGroups::class, 'id', 'id_admin_permission_group')
            ->with('admin_permissions');
    }

    public function getRoleAttribute(): object
    {
        $settings = new ClassifierSelectApiRequestSettings();

        $settings->id_object = $this->id_role;

        return RolesClassifierHandler::record($settings);
    }
}
