<?php

namespace App\Models\Admin\Systems\HttpMethods;

use App\Models\Admin\Systems\Permissions\SAdminPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SHttpMethods extends Model
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
        return $this->belongsToMany(SAdminPermissions::class, 's_http_methods_to_s_admin_permissions', 'id_admin_permission', 'id_http_method');
    }
}
