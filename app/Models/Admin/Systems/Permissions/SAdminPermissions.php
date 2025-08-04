<?php

namespace App\Models\Admin\Systems\Permissions;

use App\Models\Admin\Systems\HttpMethods\SHttpMethods;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SAdminPermissions extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable =
        [
            'code',
            'description',
            'name',
            'routes',
            'custom_pattern',
        ];

    public function getRoutesAttribute(string $value): array
    {
        return json_decode($value, true) ?? [];
    }

    public function setRoutesAttribute(? array $value): void
    {
        $this->attributes['routes'] = json_encode($value ?? [], JSON_UNESCAPED_SLASHES);
    }

    public function http_methods(): BelongsToMany
    {
        return $this->belongsToMany(SHttpMethods::class, 's_http_methods_to_s_admin_permissions', 'id_admin_permission', 'id_http_method');
    }
}
