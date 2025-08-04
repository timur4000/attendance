<?php

namespace App\Handlers\Admin\SpriteIcons\MainSpriteIcons;

use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\ISelectable;
use App\Standards\SpriteIcons\Classes\MainSpriteIcons\MainSpriteIcons;
use App\Standards\SpriteIcons\Classes\SpriteIcon;
use DOMException;
use Illuminate\Support\Collection;

/**
 * Implements help work with main sprite icons.
 */
class MainSpriteIconsHandler extends Handler implements ISelectable
{
    /**
     * Returns records.
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $main_sprite_icons = new MainSpriteIcons();

        return $main_sprite_icons->sprite_icons;
    }

    /**
     * Returns empty sprite icon.
     *
     * @return SpriteIcon
     *
     * @throws DOMException
     */
    public static function empty(): SpriteIcon
    {
        $main_sprite_icons = new MainSpriteIcons();

        return $main_sprite_icons
            ->create_sprite_icon()
            ->set_uuid();
    }

    /**
     * Returns sprite icon by the given id.
     *
     * @param string $uuid
     *
     * @return SpriteIcon|null
     */
    public static function get(string $uuid = ''): SpriteIcon | null
    {
        $main_sprite_icons = new MainSpriteIcons();

        return $main_sprite_icons->get_sprite_icon($uuid);
    }

    /**
     * Checks if sprite icon with the given id is an exist.
     *
     * @param string $uuid
     *
     * @return bool
     */
    public static function has(string $uuid = ''): bool
    {
        $main_sprite_icons = new MainSpriteIcons();

        return $main_sprite_icons->has_sprite_icon($uuid);
    }

    /**
     * @inheritdoc
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection
    {
        return self::records()->pluck($value, $key);
    }
}
