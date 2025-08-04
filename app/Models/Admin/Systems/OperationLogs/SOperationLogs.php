<?php

namespace App\Models\Admin\Systems\OperationLogs;

use App\ApiModels\Users\UserApiModel;
use App\Handlers\Admin\Users\UsersHandler;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class SOperationLogs extends Model
{
    use HasFactory;

    protected static Collection $users;

    protected $fillable =
        [
            'method',
            'path',
            'route',
            'description',
            'id_user',
            'ip_address',
            'user_agent',
            'query',
            'data',
        ];

    protected $appends =
        [
            'user',
        ];

    public function getQueryAttribute(string $value): array
    {
        return json_decode($value, true) ?? [];
    }

    public function setQueryAttribute(? array $value): void
    {
        $this->attributes['query'] = json_encode($value ?? [], JSON_UNESCAPED_SLASHES);
    }

    public function getDataAttribute(string $value): array
    {
        return json_decode($value, true) ?? [];
    }

    public function setDataAttribute(? array $value): void
    {
        $this->attributes['data'] = json_encode($value ?? [], JSON_UNESCAPED_SLASHES);
    }

    public function getUserAttribute(): UserApiModel
    {
        if (!isset(self::$users))
        {;
            self::$users = new Collection();
        }

        if (!self::$users->has($this->id_user))
        {
            $user = UsersHandler::record($this->id_user);
        }

        return self::$users->getOrPut($this->id_user, $user ?? new UserApiModel([]));
    }
}
