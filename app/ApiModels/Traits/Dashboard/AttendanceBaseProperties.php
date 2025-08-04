<?php

namespace App\ApiModels\Traits\Dashboard;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding base attendance properties.
 */
trait AttendanceBaseProperties
{
    #[ApiModelResponseKeyAttribute('Date')]
    public string $date;

    #[ApiModelResponseKeyAttribute('Hour')]
    public int $hour;

    #[ApiModelResponseKeyAttribute('IdPosition')]
    public int $id_position;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('CountEnter')]
    public int $count_enter;

    #[ApiModelResponseKeyAttribute('CountExit')]
    public int $count_exit;

    #[ApiModelResponseKeyAttribute('CountSeconds')]
    public int $count_seconds;

    /**
     * Checks if the count enter/exit properties is empty.
     *
     * @return bool
     */
    public function is_enter_exit_empty(): bool
    {
        return empty($this->count_enter) && empty($this->count_exit);
    }
}
