<div class="form-group form-group--size-default">

    <label for="{{ $element->get_id() }}" class="label label--size-default label--theme-jumbo">
        {!! $element->get_label() !!}
    </label>

    <div class="input-outer input-outer--theme-mercury input-outer--size-middle input-outer--type-label" data-input-date>

        <label for="{{ $element->get_id() }}" class="input-outer__label input-outer__label--size-middle input-outer__label--theme">
            {!! svg($element->get_svg(), [ 'class' => 'icon icon-size-14' ]) !!}
        </label>

        <div class="custom-input" data-custom-input-hover>
            <input id="{{ $element->get_id() }}" {!! $element->get_attributes() !!} class="input input--theme input--size-middle input-outer__input custom-input__input">

            <label for="{{ $element->get_id() }}" class="custom-input__float-label custom-input__float-label--type-hide custom-input__float-label--theme-jumbo">
                {{ $element->get_placeholder() }}
            </label>
        </div>

    </div>

    <label for="{{ $element->get_id() }}" class="alert alert--size-default alert--theme-persian-rose {{ get_is('inactive', !$errors->has($element->get_name())) }}" data-error-label>
        @error($element->get_name()) {{ $message }} @enderror
    </label>

</div>