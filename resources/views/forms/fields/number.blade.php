<div class="form-group form-group--size-default">

    <label for="{{ $element->get_id() }}" class="label label--size-default label--theme-jumbo">
        {!! $element->get_label() !!}
    </label>

    <div class="custom-number custom-number--size-default" data-custom-number>

        <button type="button" class="custom-number__button button button--bubble button--size-middle button--type-square button--theme-white-azure-bittersweet" data-custom-number-element="minus">
            {!! svg('essential-minus-square', [ 'class' => 'icon icon-size-14' ]) !!}
        </button>

        <input type="{{ $element->get_type() }}" name="{{ $element->get_name() }}" value="{{ $element->get_value() }}" id="{{ $element->get_id() }}" data-_readonly="{{ $element->is_readonly() }}" data-_step="{{ $element->get_step() }}" {{ get_is('data-_min=' . $element->get_min(), $element->has_min()) }} {{ get_is('data-_max=' . $element->get_max(), $element->get_max()) }} class="custom-number__input input input-type-number input--theme-mercury input--size-middle" data-custom-number-element="input">

        <button type="button" class="custom-number__button button button--bubble button--size-middle button--type-square button--theme-white-azure-wild-sand" data-custom-number-element="add">
            {!! svg('essential-add-square', [ 'class' => 'icon icon-size-14' ]) !!}
        </button>

    </div>

    <label for="{{ $element->get_id() }}" class="alert alert--size-default alert--theme-persian-rose {{ get_is('inactive', !$errors->has($element->get_name())) }}" data-error-label>
        @error($element->get_name()) {{ $message }} @enderror
    </label>

</div>