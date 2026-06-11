<?php
namespace Addresszen\Lookup\ViewModel;

use Addresszen\Lookup\Helper\Data;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\Serialize\Serializer\Json;

class StoreConfig implements ArgumentInterface
{
    /**
     * @var Data
     */
    private $helper;

    /**
     * @var Json
     */
    private $jsonSerializer;

    /**
     * Constructor
     *
     * @param Data $helper
     * @param Json $jsonSerializer
     */
    public function __construct(Data $helper, Json $jsonSerializer)
    {
        $this->helper = $helper;
        $this->jsonSerializer = $jsonSerializer;
    }

    /**
     * Get configuration value for a specific field
     *
     * @param string $field
     * @return mixed
     */
    public function getConfig($field)
    {
        return $this->helper->getConfig($field);
    }

    /**
     * Get full configuration as JSON string
     *
     * @return string
     */
    public function getJsonConfig(): string
    {
        $config = $this->helper->toConfiguration(
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        return $this->jsonSerializer->serialize([
            'apiKey' => $config['api_key'] ?? '',
            'autocomplete' => (bool)($config['addressAutocomplete'] ?? false),
            'populateCounty' => (bool)($config['requireCounty'] ?? false),
            'removeOrganisation' => (bool)($config['removeOrganisation'] ?? false),
            'autocompleteOverride' => $this->parseJsonConfig($config['autocompleteOverride'] ?? null),
            'customFields' => $this->parseJsonConfig($config['customFields'] ?? null),
            'checkoutOnly' => (bool)($config['checkoutOnly'] ?? false),
            'matchCheckout' => (bool)($config['matchCheckout'] ?? false),
            'enabled' => (bool)($config['enabled'] ?? false)
        ]);
    }

    /**
     * Check if the module is enabled
     *
     * @return bool
     */
    public function isEnabled(): bool
    {
        $config = $this->helper->toConfiguration(
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
        return (bool)($config['enabled'] ?? false);
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
