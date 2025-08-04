<div class="custom-checkbox custom-checkbox--type-bubble margin-top-20">

    <input type="checkbox" name="{{ $data['input_name'] }}" value="1" id="{{ $data['input_name'] }}" class="custom-checkbox__input" hidden @if(old($data['input_name']) || isset($data['is_checked'])) checked @endif>

    <label for="{{ $data['input_name'] }}" class="custom-checkbox__label custom-checkbox__label--size-middle">

        <span class="custom-checkbox__icon-outer custom-checkbox__icon-outer--size-middle custom-checkbox__icon-outer--theme-white">

            <span class="custom-checkbox__icon custom-checkbox__icon--type-on">
                {!! svg('essential-check', [ 'class' => 'icon icon-size-10' ]) !!}
            </span>

            <span class="custom-checkbox__icon custom-checkbox__icon--type-off">
                {!! svg('essential-close', [ 'class' => 'icon icon-size-10' ]) !!}
            </span>

        </span>

        <span class="custom-checkbox__text">
            {{ $data['input_placeholder'] }}
        </span>

    </label>

</div>

@error($data['input_name'])

<label for="{{ $data['input_name'] }}" class="alert alert--size-default alert--theme-persian-rose">
    {{ $message }}
</label>

@enderror