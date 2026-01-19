<?php
namespace Addresszen\Lookup\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Encryption\EncryptorInterface;
use Magento\Framework\View\Asset\Repository;
use Magento\Store\Model\ScopeInterface;
use Magento\Store\Model\StoreManagerInterface;

/**
 * Helper class for Address Zen configuration
 */
class Data extends AbstractHelper
{
    /**
     * @var EncryptorInterface
     */
    protected $encryptor;

    /**
     * @var Repository
     */
    protected $repository;

    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;

    /**
     * Constructor
     *
     * @param Context $context
     * @param EncryptorInterface $encryptor
     * @param Repository $repository
     * @param StoreManagerInterface $storeManager
     */
    public function __construct(
        Context $context,
        EncryptorInterface $encryptor,
        Repository $repository,
        StoreManagerInterface $storeManager
    )
    {
        parent::__construct($context);
        $this->encryptor = $encryptor;
        $this->repository = $repository;
        $this->storeManager = $storeManager;
    }

    /**
     * Get current store ID
     *
     * @return int
     */
    public function getStoreId()
    {
        return $this->storeManager->getStore()->getId();
    }

    /**
     * Check if Address Zen is enabled
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabled(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/enabled',
            $scope,
            $storeId
        );
    }

    /**
     * Check if admin autocomplete is enabled
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabledAdminAutocomplete(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/admin_autocomplete',
            $scope,
            $storeId
        );
    }

    /**
     * Get API key
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getApiKey(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $apiKey = $this->scopeConfig->getValue(
            'addresszen/settings/api_key',
            $scope,
            $storeId
        );
        return $apiKey;
    }

    /**
     * Get checkout targets
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getCheckoutTargets(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $apiKey = $this->scopeConfig->getValue(
            'addresszen/settings/checkout_targets',
            $scope,
            $storeId
        );
        return $apiKey;
    }

    /**
     * Get customer address target
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getCustomerAddressTarget(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $apiKey = $this->scopeConfig->getValue(
            'addresszen/settings/customer_address_target',
            $scope,
            $storeId
        );
        return $apiKey;
    }

    /**
     * Get multishipping checkout targets
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getMultishippingCheckoutTargets(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $apiKey = $this->scopeConfig->getValue(
            'addresszen/settings/multishipping_checkout_targets',
            $scope,
            $storeId
        );
        return $apiKey;
    }

    /**
     * Get multishipping checkout register target
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getMultishippingCheckoutRegisterTarget(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $apiKey = $this->scopeConfig->getValue(
            'addresszen/settings/multishipping_checkout_register_target',
            $scope,
            $storeId
        );
        return $apiKey;
    }

    /**
     * Get user token
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getUserToken(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $userToken = $this->scopeConfig->getValue(
            'addresszen/settings/user_token',
            $scope,
            $storeId
        );
        return $userToken;
    }

    /**
     * Get autocomplete override
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function getAutocompleteOverride(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->getValue(
            'addresszen/settings/autocomplete_override',
            $scope,
            $storeId
        );
    }

    /**
     * Check if autocomplete is used
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function usesAutocomplete(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/autocomplete',
            $scope,
            $storeId
        );
    }

    /**
     * Check if organisation should be removed
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function removeOrganisation(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/remove_organisation_store',
            $scope,
            $storeId
        );
    }

    /**
     * Check if organisation should be removed in admin
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function removeOrganisationAdmin(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/remove_organisation_admin',
            $scope,
            $storeId
        );
    }

    /**
     * Check if county is required
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function requireCounty(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/require_county',
            $scope,
            $storeId
        );
    }

    /**
     * Check if country should be hoisted
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function hoistCountry(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/hoist_country',
            $scope,
            $storeId
        );
    }

    /**
     * Get custom fields configuration
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function customFields(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->getValue(
            'addresszen/settings/custom_fields',
            $scope,
            $storeId
        );
    }

    /**
     * Check if checkout only mode is enabled
     *
     * @param string $scope
     * @param int|null $storeId
     * @return bool
     */
    public function checkoutOnly(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->isSetFlag(
            'addresszen/settings/checkout_only',
            $scope,
            $storeId
        );
    }

    /**
     * Get match checkout page configuration
     *
     * @param string $scope
     * @param int|null $storeId
     * @return string|null
     */
    public function matchCheckout(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        return $this->scopeConfig->getValue(
            'addresszen/settings/match_checkout_page',
            $scope,
            $storeId
        );
    }

    /**
     * Convert to configuration array
     *
     * @param string $scope
     * @param int|null $storeId
     * @return array
     */
    public function toConfiguration(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
        $storeId = null
    )
    {
        $config = [
            'enabled' => $this->isEnabled($scope, $storeId),
            'api_key' => $this->getApiKey($scope, $storeId),
            'addressAutocomplete' => $this->usesAutocomplete($scope, $storeId),
            'removeOrganisation' => $this->removeOrganisation($scope, $storeId),
            'hoistCountryField' => $this->hoistCountry($scope, $storeId),
            'requireCounty' => $this->requireCounty($scope, $storeId),
            'autocompleteOverride' => $this->getAutocompleteOverride($scope, $storeId),
            "customFields" => $this->customFields($scope, $storeId),
            "checkoutOnly" => $this->checkoutOnly($scope, $storeId),
            "matchCheckout" => $this->matchCheckout($scope, $storeId)
        ];
        return $config;
    }

    /**
     * Convert to admin configuration array
     *
     * @param string $scope
     * @return array
     */
    public function toAdminConfiguration(
        $scope = ScopeConfigInterface::SCOPE_TYPE_DEFAULT
    )
    {
        $config = [
            'enabled' => $this->isEnabled($scope),
            'api_key' => $this->getApiKey($scope),
            'addressAutocomplete' => $this->isEnabledAdminAutocomplete($scope),
            'removeOrganisation' => $this->removeOrganisationAdmin($scope),
            'hoistCountryField' => $this->hoistCountry($scope),
            'requireCounty' => $this->requireCounty($scope),
            "customFields" => $this->customFields($scope)
        ];
        return $config;
    }

    /**
     * Get configuration field value
     *
     * @param string $field
     * @return string
     */
    public function getConfig($field)
    {
        $config = $this->toConfiguration(
            ScopeInterface::SCOPE_STORE
        );
        return is_bool($config[$field])
            ? ($config[$field] ? 'true' : 'false')
            : $config[$field];
    }

    /**
     * Get admin configuration field value
     *
     * @param string $field
     * @return string
     */
    public function getAdminConfig($field)
    {
        $config = $this->toAdminConfiguration();
        return is_bool($config[$field])
            ? ($config[$field] ? 'true' : 'false')
            : $config[$field];
    }

    /**
     * Get file URL
     *
     * @param string $file
     * @return string
     */
    public function getFileUrl($file)
    {
        $asset = $this->repository->createAsset("Addresszen_Lookup::$file");
        return $asset->getUrl();
    }
}
