<div class="input-outer input-outer--theme-mercury input-outer--size-middle margin-top-30">

    <label for="{{ $data['input_name'] }}" class="input-outer__label input-outer__label--size-middle input-outer__label--theme">
        {!! svg($data['icon_id'], [ 'class' => 'icon icon-size-16' ]) !!}
    </label>

    <div class="custom-input" data-custom-input-hover>
        <input type="password" name="{{ $data['input_name'] }}" class="input input--theme input--size-middle input-outer__input custom-input__input" placeholder=" " id="{{ $data['input_name'] }}" autocomplete="off">

        <label for="{{ $data['input_name'] }}" class="custom-input__float-label custom-input__float-label--type-left custom-input__float-label--theme-jumbo">
            {{ $data['input_placeholder'] }}
        </label>
    </div>

    <button type="button" class="input-outer__label input-outer__label--size-middle password-toggle button button--value-bubble button--theme-azure" data-password-toggle="password">

        <span class="password-toggle__icon password-toggle__icon--type-off">
            {!! svg('security-eye-slash', [ 'class' => 'icon icon-size-16' ]) !!}
        </span>

        <span class="password-toggle__icon password-toggle__icon--type-on">
            {!! svg('security-eye', [ 'class' => 'icon icon-size-16' ]) !!}
        </span>

    </button>

</div>

@error($data['input_name'])

<label for="{{ $data['input_name'] }}" class="alert alert--size-default alert--theme-persian-rose">
    {{ $message }}
</label>

@enderror