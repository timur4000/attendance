<?php

namespace App\RouteGroups\Admin;

use App\Managers\Admin\AdminConfigManager;
use App\RouteGroups\Admin\Absences\AbsencesRouteGroup;
use App\RouteGroups\Admin\Accounting\AccountingRouteGroup;
use App\RouteGroups\Admin\AdminMenu\AdminMenuRouteGroup;
use App\RouteGroups\Admin\AdminPermissionGroups\AdminPermissionGroupsRouteGroup;
use App\RouteGroups\Admin\AdminRoles\AdminRolesRouteGroup;
use App\RouteGroups\Admin\Authorization\AuthorizationRouteGroup;
use App\RouteGroups\Admin\Canteen\CanteenRouteGroup;
use App\RouteGroups\Admin\Classifiers\ClassifiersRouteGroup;
use App\RouteGroups\Admin\ClassifierTypes\ClassifierTypesRouteGroup;
use App\RouteGroups\Admin\Configurations\ConfigurationsRouteGroup;
use App\RouteGroups\Admin\Dashboard\DashboardRouteGroup;
use App\RouteGroups\Admin\Dashboards\DashboardsRouteGroup;
use App\RouteGroups\Admin\FoodCard\FoodCardRouteGroup;
use App\RouteGroups\Admin\FrontendLogs\FrontendLogsRouteGroup;
use App\RouteGroups\Admin\Gallery\GalleryRouteGroup;
use App\RouteGroups\Admin\HttpMethods\HttpMethodsRouteGroup;
use App\RouteGroups\Admin\Localizations\LocalizationRouteGroup;
use App\RouteGroups\Admin\MainSpriteIcons\MainSpriteIconsRouteGroup;
use App\RouteGroups\Admin\ObjectPictures\ObjectPicturesRouteGroup;
use App\RouteGroups\Admin\OperationLogs\OperationLogsRouteGroup;
use App\RouteGroups\Admin\Orders\OrdersRouteGroup;
use App\RouteGroups\Admin\OrdersList\OrdersListRouteGroup;
use App\RouteGroups\Admin\Parameters\ParametersRouteGroup;
use App\RouteGroups\Admin\Permissions\AdminPermissionsRouteGroup;
use App\RouteGroups\Admin\Presence\PresenceRouteGroup;
use App\RouteGroups\Admin\Prices\PricesRouteGroup;
use App\RouteGroups\Admin\ScaUsers\ScaUsersRouteGroup;
use App\RouteGroups\Admin\ServicesPayment\ServicesPaymentRouteGroup;
use App\RouteGroups\Admin\SimpleOrders\SimpleOrdersRouteGroup;
use App\RouteGroups\Admin\SimpleOrdersList\SimpleOrdersListRouteGroup;
use App\RouteGroups\Admin\Terminal\TerminalRouteGroup;
use App\RouteGroups\Admin\Users\UsersRouteGroup;
use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Declares group for admin routes.
 */
class AdminRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier(AdminConfigManager::get_option(AdminConfigClassifier::identifier));

        $this->add_middleware(MiddlewareClassifiers::admin_localizations);

        $this->add_middleware(MiddlewareClassifiers::admin_authorization);

        $this->add_middleware(MiddlewareClassifiers::admin_access_key_middleware);

        $this->add_middleware(MiddlewareClassifiers::admin_operation_logs);

        $this->add_middleware(MiddlewareClassifiers::admin_roles);
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    function callable(): void
    {
        $this->call(AuthorizationRouteGroup::class);

        $this->call(LocalizationRouteGroup::class);

        $this->call(DashboardRouteGroup::class);

        $this->call(DashboardsRouteGroup::class);

        $this->call(ClassifiersRouteGroup::class);

        $this->call(UsersRouteGroup::class);

        $this->call(ScaUsersRouteGroup::class);

        $this->call(ClassifierTypesRouteGroup::class);

        $this->call(PresenceRouteGroup::class);

        $this->call(ServicesPaymentRouteGroup::class);

        $this->call(PricesRouteGroup::class);

        $this->call(AdminPermissionsRouteGroup::class);

        $this->call(AdminPermissionGroupsRouteGroup::class);

        $this->call(AdminRolesRouteGroup::class);

        $this->call(HttpMethodsRouteGroup::class);

        $this->call(MainSpriteIconsRouteGroup::class);

        $this->call(AdminMenuRouteGroup::class);

        $this->call(FoodCardRouteGroup::class);

        $this->call(AbsencesRouteGroup::class);

        $this->call(TerminalRouteGroup::class);

        $this->call(OperationLogsRouteGroup::class);

        $this->call(OrdersRouteGroup::class);

        $this->call(OrdersListRouteGroup::class);

        $this->call(ParametersRouteGroup::class);

        $this->call(SimpleOrdersRouteGroup::class);

        $this->call(SimpleOrdersListRouteGroup::class);

        $this->call(ConfigurationsRouteGroup::class);

        $this->call(AccountingRouteGroup::class);

        $this->call(CanteenRouteGroup::class);

        $this->call(GalleryRouteGroup::class);

        $this->call(ObjectPicturesRouteGroup::class);

        $this->call(FrontendLogsRouteGroup::class);
    }
}
