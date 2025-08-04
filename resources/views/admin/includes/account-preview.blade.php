<section class="account-preview dropdown" data-dropdown data-content-id="account-possibilities">

    <div class="account-preview__line dropdown__toggle dropdown__toggle--size-middle dropdown__toggle--theme-wild-bold" data-dropdown-toggle>

        <div class="account-preview__description">

            <h3 class="account-preview__heading account-preview__heading--size-default">
                {{ admin_authorization()->user()->full_name() }}
            </h3>

            <p class="account-preview__sub-heading account-preview__sub-heading--size-default account-preview__sub-heading--theme">
                {{ admin_authorization()->user()->category_name ?? '' }}
            </p>

        </div>

        <div class="account-preview__image account-preview__image--theme-mercury image">

            <img src="{{ \App\Handlers\Admin\Pictures\ObjectPicturesHandler::base64(admin_authorization()->id(), \App\Standards\ApiRequests\Classifiers\PictureCodeEntityTypesClassifier::USER) ?: asset('/assets/images/systems/default-avatar.svg') }}" alt="account image" class="account-preview__image-element image__element">

        </div>

    </div>

    @include(admin_directory('includes.account-preview-list'))
</section>