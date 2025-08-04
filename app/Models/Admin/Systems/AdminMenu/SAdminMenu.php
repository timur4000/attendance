<?php

namespace App\Models\Admin\Systems\AdminMenu;

use App\Models\Admin\Systems\AdminPermissionGroups\SAdminPermissionGroups;
use App\Models\Admin\Systems\Permissions\SAdminPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SAdminMenu extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 's_admin_menu';

    protected $fillable =
        [
            'id_parent',
            'title',
            'description',
            'id_icon',
            'route',
            'sort_order',
            'is_active',
        ];

    public function admin_permissions(): BelongsToMany
    {
        return $this
            ->belongsToMany(SAdminPermissions::class, 's_admin_permissions_to_s_admin_menu', 'id_admin_menu', 'id_admin_permission')
            ->with('http_methods');
    }

    public function admin_permission_groups(): BelongsToMany
    {
        return $this
            ->belongsToMany(SAdminPermissionGroups::class, 's_admin_permission_groups_to_s_admin_menu', 'id_admin_menu', 'id_admin_permission_group');
    }

    public function admin_menu(): BelongsTo
    {
        return $this
            ->belongsTo(SAdminMenu::class, 'id_parent', 'id')
            ->with('admin_permissions');
    }
}
