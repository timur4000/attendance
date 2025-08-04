<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\AdminMenu\SAdminMenu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $last_sort_order = 0;

        $sort_order = 0;

        foreach ($this->records() as $record)
        {
//            $record['id_admin_permission_group'] = 1;

            $sort_order += 100;

            if ($record[ 'id_parent'] === null)
            {
                $sort_order = 0;
            }
            else if ($record['id_parent'] !== 0 && $last_sort_order === 0)
            {
                $last_sort_order = $sort_order;

                $sort_order = 0;
            }
            else if ($record['id_parent'] === 0 && $last_sort_order !== 0)
            {
                $sort_order = $last_sort_order;

                $last_sort_order = 0;
            }

            $record['sort_order'] = $sort_order;

            SAdminMenu::query()->create($record);
        }
    }

    /**
     * @return array[]
     */
    private function records(): array
    {
        return
            [
                [
                    'id' => 0,
                    'id_parent' => null,
                    'title' => 'ROOT',
                    'description' => null,
                    'id_icon' => null,
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Dashboard',
                    'description' => null,
                    'id_icon' => 'business-trend-up',
                    'route' => 'admin.dashboard.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Canteen Dashboard',
                    'description' => null,
                    'id_icon' => 'business-trend-up',
                    'route' => 'admin.dashboards.canteen.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Orders',
                    'description' => null,
                    'id_icon' => 'computers-monitor',
                    'route' => 'admin.orders.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Orders List',
                    'description' => null,
                    'id_icon' => 'money-receipt-item',
                    'route' => 'admin.orders-list.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Admin Menu',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.admin-menu.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Terminal',
                    'description' => null,
                    'id_icon' => 'programming-code',
                    'route' => 'admin.terminal.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Operation Logs',
                    'description' => null,
                    'id_icon' => 'time-start',
                    'route' => 'admin.operation-logs.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Main Sprite Icons',
                    'description' => null,
                    'id_icon' => 'settings-category',
                    'route' => 'admin.main-sprite-icons.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Http Methods',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.http-methods.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Admin Permissions',
                    'description' => null,
                    'id_icon' => 'security-shield',
                    'route' => 'admin.admin-permissions.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Admin Permission Groups',
                    'description' => null,
                    'id_icon' => 'security-shield',
                    'route' => 'admin.admin-permission-groups.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Admin Roles',
                    'description' => null,
                    'id_icon' => 'security-user',
                    'route' => 'admin.admin-roles.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Users',
                    'description' => null,
                    'id_icon' => 'user-profiles',
                    'route' => 'admin.users.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Advanced Users',
                    'description' => null,
                    'id_icon' => 'user-profiles',
                    'route' => 'admin.sca-users.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0, // ID => 15
                    'title' => 'Prices',
                    'description' => null,
                    'id_icon' => 'money-dollar-square',
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 15,
                    'title' => 'Invoices',
                    'description' => null,
                    'id_icon' => 'money-empty-wallet-time',
                    'route' => 'admin.prices.invoices.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 15,
                    'title' => 'Food',
                    'description' => null,
                    'id_icon' => 'money-empty-wallet-time',
                    'route' => 'admin.prices.food.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0, // ID => 18
                    'title' => 'Presence',
                    'description' => null,
                    'id_icon' => 'business-up',
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 18,
                    'title' => 'Latecomers',
                    'description' => null,
                    'id_icon' => 'time-clock-alert-outline',
                    'route' => 'admin.presence.latecomers.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 18,
                    'title' => 'Arrived On Time',
                    'description' => null,
                    'id_icon' => 'time-clock-check-outline',
                    'route' => 'admin.presence.arrived-on-time.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 18,
                    'title' => 'Absent',
                    'description' => null,
                    'id_icon' => 'time-clock-check-outline',
                    'route' => 'admin.presence.absent.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0, // ID => 22
                    'title' => 'Services Payment',
                    'description' => null,
                    'id_icon' => 'money-receipt-item',
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 22,
                    'title' => 'Tuition',
                    'description' => null,
                    'id_icon' => 'money-empty-wallet-time',
                    'route' => 'admin.services-payment.tuition.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Classifier Types',
                    'description' => null,
                    'id_icon' => 'content-menu-board',
                    'route' => 'admin.classifier-types.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0, // ID => 25
                    'title' => 'Classifiers',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Units',
                    'description' => null,
                    'id_icon' => 'programming-hierarchy',
                    'route' => 'admin.classifiers.units.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Positions',
                    'description' => null,
                    'id_icon' => 'user-people',
                    'route' => 'admin.classifiers.positions.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Currencies',
                    'description' => null,
                    'id_icon' => 'money-wallet',
                    'route' => 'admin.classifiers.currencies.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Languages',
                    'description' => null,
                    'id_icon' => 'location-global',
                    'route' => 'admin.classifiers.languages.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Food',
                    'description' => null,
                    'id_icon' => 'essential-reserve',
                    'route' => 'admin.classifiers.food.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Genders',
                    'description' => null,
                    'id_icon' => 'user-gender',
                    'route' => 'admin.classifiers.genders.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Countries',
                    'description' => null,
                    'id_icon' => 'programming-hierarchy',
                    'route' => 'admin.classifiers.countries.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Person Categories',
                    'description' => null,
                    'id_icon' => 'content-menu-board',
                    'route' => 'admin.classifiers.person-categories.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Statuses',
                    'description' => null,
                    'id_icon' => 'business-health',
                    'route' => 'admin.classifiers.statuses.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Absences',
                    'description' => null,
                    'id_icon' => 'user-people',
                    'route' => 'admin.classifiers.absences.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 25,
                    'title' => 'Roles',
                    'description' => null,
                    'id_icon' => 'user-profile-delete',
                    'route' => 'admin.classifiers.roles.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0, // id => 37
                    'title' => 'Configurations',
                    'description' => null,
                    'id_icon' => 'settings-gear',
                    'route' => null,
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 37,
                    'title' => 'Groups',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.configurations.groups.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 37,
                    'title' => 'Types',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.configurations.types.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 37,
                    'title' => 'Values',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.configurations.values.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Parameters',
                    'description' => null,
                    'id_icon' => 'content-task',
                    'route' => 'admin.parameters.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
                [
                    'id_parent' => 0,
                    'title' => 'Accounting',
                    'description' => null,
                    'id_icon' => 'money-wallet',
                    'route' => 'admin.accounting.index',
                    'sort_order' => 0,
                    'is_active' => true,
                ],
            ];
    }
}
