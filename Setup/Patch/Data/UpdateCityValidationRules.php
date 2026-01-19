<?php
/**
 * Copyright (c) Address Zen
 *
 * Address Zen Magento Extension
 *
 * This extension provides US address search functionality for Magento 2
 * checkout and customer address forms using the Address Zen API.
 *
 * @package Addresszen_Lookup
 * @author Address Zen <support@addresszen.com>
 * @copyright Address Zen
 * @license MIT https://opensource.org/licenses/MIT
 * @link https://addresszen.com
 */

namespace Addresszen\Lookup\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Customer\Setup\CustomerSetupFactory;
use Magento\Customer\Api\AddressMetadataInterface;

/**
 * Data Patch to Update City Validation Rules
 *
 * This patch updates the city attribute validation rules to allow
 * real-world city names with periods (e.g., "St. Louis"), numbers,
 * ampersands, and other common punctuation marks.
 *
 * The default Magento validation regex is too restrictive and only
 * allows letters and spaces, which fails for cities like:
 * - St. Louis
 * - St. Petersburg
 * - Winston-Salem
 * - 29 Palms
 *
 * This override implements a more permissive pattern while maintaining
 * security and data integrity.
 */
class UpdateCityValidationRules implements DataPatchInterface
{
    /**
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var CustomerSetupFactory
     */
    private $customerSetupFactory;

    /**
     * Constructor
     *
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param CustomerSetupFactory $customerSetupFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        CustomerSetupFactory $customerSetupFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->customerSetupFactory = $customerSetupFactory;
    }

    /**
     * Apply the data patch
     *
     * @return void
     */
    public function apply()
    {
        $this->moduleDataSetup->startSetup();

        $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

        // Get the address entity type ID
        $addressEntityTypeId = $customerSetup->getEntityTypeId(
            AddressMetadataInterface::ENTITY_TYPE_ADDRESS
        );

        // Get the current city attribute configuration
        $cityAttribute = $customerSetup->getAttribute($addressEntityTypeId, 'city');

        if ($cityAttribute) {
            // Get existing validation rules
            $validateRules = $cityAttribute['validate_rules'] ?? [];

            // Decode JSON if it's stored as a string
            if (is_string($validateRules)) {
                $validateRules = json_decode($validateRules, true) ?: [];
            }

            // Remove restrictive validation rules
            // Keep only max_text_length and min_text_length
            $validateRules = [
                'max_text_length' => 255,
                'min_text_length' => 1,
                'input_validation' => 'length'
            ];

            // Update the attribute with relaxed validation rules
            // This removes the validate-alpha restriction
            // input_filter strips HTML tags to prevent XSS attacks
            $customerSetup->updateAttribute(
                $addressEntityTypeId,
                'city',
                [
                    'validate_rules' => json_encode($validateRules, JSON_UNESCAPED_SLASHES),
                    'frontend_class' => null,
                    'input_filter' => 'striptags'
                ]
            );
        }

        $this->moduleDataSetup->endSetup();
    }

    /**
     * Get array of patches that have to be executed prior to this
     *
     * @return string[]
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * Get aliases (previous names) for the patch
     *
     * @return string[]
     */
    public function getAliases()
    {
        return [];
    }
}
