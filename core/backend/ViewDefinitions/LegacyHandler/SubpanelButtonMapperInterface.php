<?php

namespace App\ViewDefinitions\LegacyHandler;

use App\Module\Service\ModuleAwareRegistryItemInterface;

interface SubpanelButtonMapperInterface extends ModuleAwareRegistryItemInterface
{

    /**
     * Map value
     * @param string $parentModule
     * @param array $subpanel
     * @param array $button
     * @param array $parentVardefs
     * @return array
     */
    public function map(
        string $parentModule,
        array $subpanel,
        array $button,
        array $parentVardefs
    ): array;
}