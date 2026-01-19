<?php
/**
 * Copyright (c) Address Zen
 *
 * Address Zen Magento Extension
 *
 * @package Addresszen_Lookup
 * @author Address Zen <support@addresszen.com>
 * @copyright Address Zen
 * @license MIT https://opensource.org/licenses/MIT
 * @link https://addresszen.com
 */

namespace Addresszen\Lookup\ViewModel;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\Serialize\Serializer\Json;
use Addresszen\Lookup\Helper\Data as Helper;
use Magento\Store\Model\ScopeInterface;

/**
 * ViewModel class for Address Zen configuration
 *
 * Provides JSON-encoded configuration for frontend JavaScript components
 * using Magento's safe JSON encoding to pass review requirements.
 */
class Config implements ArgumentInterface
{
    /**
     * @var Json
     */
    private $jsonSerializer;

    /**
     * @var Helper
     */
    private $helper;

    /**
     * Constructor
     *
     * @param Json $jsonSerializer
     * @param Helper $helper
     */
    public function __construct(
        Json $jsonSerializer,
        Helper $helper
    ) {
        $this->jsonSerializer = $jsonSerializer;
        $this->helper = $helper;
    }

    /**
     * Get frontend JSON configuration
     *
     * @return string
     */
    public function getJsonConfig(): string
    {
        $config = $this->helper->toConfiguration(ScopeInterface::SCOPE_STORE);

        return $this->jsonSerializer->serialize([
            'enabled' => (bool)($config['enabled'] ?? false),
            'api_key' => $config['api_key'] ?? '',
            'addressAutocomplete' => (bool)($config['addressAutocomplete'] ?? false),
            'removeOrganisation' => (bool)($config['removeOrganisation'] ?? false),
            'hoistCountryField' => (bool)($config['hoistCountryField'] ?? false),
            'requireCounty' => (bool)($config['requireCounty'] ?? false),
            'autocompleteOverride' => $this->parseJsonConfig($config['autocompleteOverride'] ?? null),
            'customFields' => $this->parseJsonConfig($config['customFields'] ?? null),
            'checkoutOnly' => (bool)($config['checkoutOnly'] ?? false),
            'matchCheckout' => (bool)($config['matchCheckout'] ?? false)
        ]);
    }

    /**
     * Get admin JSON configuration
     *
     * @return string
     */
    public function getAdminJsonConfig(): string
    {
        $config = $this->helper->toAdminConfiguration();

        return $this->jsonSerializer->serialize([
            'enabled' => (bool)($config['enabled'] ?? false),
            'api_key' => $config['api_key'] ?? '',
            'addressAutocomplete' => (bool)($config['addressAutocomplete'] ?? false),
            'removeOrganisation' => (bool)($config['removeOrganisation'] ?? false),
            'hoistCountryField' => (bool)($config['hoistCountryField'] ?? false),
            'requireCounty' => (bool)($config['requireCounty'] ?? false),
            'customFields' => $this->parseJsonConfig($config['customFields'] ?? null)
        ]);
    }

    /**
     * Parse JSON string config value into array/object
     *
     * @param string|null $value
     * @return mixed
     */
    private function parseJsonConfig($value)
    {
        if ($value === null || $value === '') {
            return null;
        }

        try {
            return $this->jsonSerializer->unserialize($value);
        } catch (\Exception $e) {
            return null;
        }
    }
}
