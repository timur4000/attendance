<div class="form-group form-group--size-default">

    <div class="custom-checkbox custom-checkbox--type-bubble margin-top-20">

        <input type="{{ $element->get_type() }}" name="{{ $element->get_name() }}" value="{{ $element->get_default_value() }}" id="{{ $element->get_id() }}" {{ get_is('checked', $element->is_checked()) }} class="custom-checkbox__input" hidden>

        <label for="{{ $element->get_id() }}" class="custom-checkbox__label custom-checkbox__label--size-middle">

        <span class="custom-checkbox__icon-outer custom-checkbox__icon-outer--size-middle custom-checkbox__icon-outer--theme-white">

            <span class="custom-checkbox__icon custom-checkbox__icon--type-on">
                {!! svg('essential-check', [ 'class' => 'icon icon-size-12' ]) !!}
            </span>

            <span class="custom-checkbox__icon custom-checkbox__icon--type-off">
                {!! svg('essential-close', [ 'class' => 'icon icon-size-10' ]) !!}
            </span>

        </span>

        <span class="custom-checkbox__text">
            {{ $element->get_placeholder() }}
        </span>

        </label>

    </div>

    @error($element->get_name())

    <label for="{{ $element->get_name() }}" class="alert alert--size-default alert--theme-persian-rose">
        {{ $message }}
    </label>

    @enderror

</div>