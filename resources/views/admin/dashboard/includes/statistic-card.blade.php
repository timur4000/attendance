<div class="statistic-card card card--theme-white" data-dashboard-statistic-card="{{ $record->name_category }}">

    <div class="card-head card-head--type-center card-head--theme-jumbo card-head--size-default">

        <h2 class="card-heading card-heading--theme-jumbo card-heading--size-default">{{ $record->name_category }}</h2>

    </div>

    <div class="card-main card-main--size-default">

        <div class="grid-row">

            <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">

                <h3 class="statistic-card__heading statistic-card__heading--size-default">Inside</h3>

                <div class="statistic-progress statistic-progress--theme-royal-blue statistic-progress--size-default">

                    <div class="statistic-progress__property statistic-progress__icon--size-default">
                        <span data-first-value="{{ $record->code_category }}">{{ $record->count_at_work }}</span>/<span data-first-total="{{ $record->code_category }}">{{ $record->count_total }}</span>
                    </div>

                    <svg viewBox="0 0 120 120" class="statistic-progress__progress">
                        <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer" />

                        <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" style="--statistic-progress-level: {{ get_percent_of_total($record->count_at_work, $record->count_total) }};" />
                    </svg>
                </div>

            </div>

            <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">

                <h3 class="statistic-card__heading statistic-card__heading--size-default">Outside</h3>

                <div class="statistic-progress statistic-progress--theme-royal-blue statistic-progress--size-default">

                    <div class="statistic-progress__property">
                        <span data-first-value="{{ $record->code_category }}">{{ $record->count_at_home }}</span>/<span data-first-total="{{ $record->code_category }}">{{ $record->count_total }}</span>
                    </div>

                    <svg viewBox="0 0 120 120" class="statistic-progress__progress">
                        <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer" />

                        <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" style="--statistic-progress-level: {{ get_percent_of_total($record->count_at_home, $record->count_total) }};" />
                    </svg>
                </div>

            </div>

        </div>

    </div>

</div>