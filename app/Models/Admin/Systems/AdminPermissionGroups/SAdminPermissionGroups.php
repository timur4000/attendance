<?php

namespace App\Models\Admin\Systems\AdminPermissionGroups;

use App\Models\Admin\Systems\Permissions\SAdminPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SAdminPermissionGroups extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable =
        [
            'code',
            'description',
        ];

    public function admin_permissions(): BelongsToMany
    {
        return $this
            ->belongsToMany(SAdminPermissions::class, 's_admin_permissions_to_s_admin_permission_groups', 'id_admin_permission_group', 'id_admin_permission')
            ->with('http_methods');
    }
}
