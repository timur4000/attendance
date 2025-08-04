<?php

namespace App\Handlers\Admin\OperationLogs;

use App\Models\Admin\Systems\OperationLogs\SOperationLogs;
use App\Standards\Classifiers\Date\DateFormatsClassifier;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IRecording;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Implements help work with operation logs.
 */
class OperationLogsHandler extends Handler implements IRecording
{
    /**
     * @inheritdoc
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $json = request()->json()->all();

        $records = SOperationLogs::query();

        self::order_by($json['order_by'] ?? [], $records);

        if (isset($json['limit']))
        {
            $records->limit($json['limit']);
        }

        if (isset($json['offset']))
        {
            $records->offset($json['offset']);
        }

        return $records->get();
    }

    /**
     * Returns total of records.
     *
     * @return int
     */
    public static function total(): int
    {
        return SOperationLogs::all()->count();
    }

    /**
     * Creates new record from the given attributes.
     *
     * @param array $attributes
     *
     * @return Model
     */
    public static function create(array $attributes = []): Model
    {
        return SOperationLogs::query()->create($attributes);
    }

    /**
     * Implements process of the past records.
     *
     * @todo Need refactoring with cron.
     *
     * @return void
     */
    public static function past_records_processing(): void
    {
        SOperationLogs::query()
            ->whereDate('created_at', '<', date(DateFormatsClassifier::Y_m_d_H_i_s->value, strtotime('-1 days')))
            ->delete();
    }
}
