-- INSERT INTO `oauth2clients` (`id`, `name`, `date_entered`, `date_modified`, `modified_user_id`, `created_by`, `description`, `deleted`, `secret`, `redirect_url`, `is_confidential`, `allowed_grant_type`, `duration_value`, `duration_amount`, `duration_unit`, `assigned_user_id`) VALUES
-- ('API-4c59-f678-cecc-6594-5a8d9c704473', 'Password Grant API Client', '2018-02-21 16:20:43', '2018-02-21 16:20:43', '1', '1', NULL, 0, '$1$LWHSyJNo$Dg3KssRJcfw85uRJcF/py.', 'https://test.com', 1, 'password', 8640000, 1, 'day', NULL),
-- ('API-6d34-6c4c-59be-9fb5-5a8d9cda918f', 'Implicit API Client', '2018-02-21 16:22:07', '2018-02-21 16:22:17', '1', '1', NULL, 0, '$1$LWHSyJNo$Dg3KssRJcfw85uRJcF/py.', 'https://test.com', 1, 'implicit', 8640000, 1, 'day', NULL),
-- ('API-b95b-19cd-0229-a3ed-5a8d9cc0d3eb', 'Authorization Code API Client', '2018-02-21 16:22:46', '2018-02-21 16:22:46', '1', '1', NULL, 0, '$1$LWHSyJNo$Dg3KssRJcfw85uRJcF/py.', 'https://test.com', 1, 'authorization_code', 8640000, 1, 'day', NULL),
-- ('API-ea74-c352-badd-c2be-5a8d9c9d4351', 'Client Credentials API Client', '2018-02-21 16:21:42', '2018-02-22 17:03:17', '1', '1', NULL, 0, '$1$LWHSyJNo$Dg3KssRJcfw85uRJcF/py.', 'https://test.com', 1, 'client_credentials', 1, 1, 'day', '1');


INSERT INTO `oauth2clients` (`id`, `name`, `date_entered`, `date_modified`, `modified_user_id`, `created_by`, `description`, `deleted`, `secret`, `redirect_url`, `is_confidential`, `allowed_grant_type`, `duration_value`, `duration_amount`, `duration_unit`, `assigned_user_id`) VALUES
('API-4c59-f678-cecc-6594-5a8d9c704473', 'suitecrm_client', '2018-06-12 14:12:49', '2018-06-12 14:12:49', '1', '1', NULL, 0, '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', NULL, 1, 'password', 60, 1, 'minute', NULL);

INSERT INTO `accounts` (`id`, `name`, `date_entered`, `date_modified`, `modified_user_id`, `created_by`, `description`, `deleted`, `assigned_user_id`, `account_type`, `industry`, `annual_revenue`, `phone_fax`, `billing_address_street`, `billing_address_city`, `billing_address_state`, `billing_address_postalcode`, `billing_address_country`, `rating`, `phone_office`, `phone_alternate`, `website`, `ownership`, `employees`, `ticker_symbol`, `shipping_address_street`, `shipping_address_city`, `shipping_address_state`, `shipping_address_postalcode`, `shipping_address_country`, `parent_id`, `sic_code`, `campaign_id`) VALUES
('11c34eba-76e0-8f0d-6f1d-5e567b77e52c', 'RR. Talker Co', '2020-02-26 14:06:59', '2020-02-26 14:06:59', '1', '1', NULL, 0, 'seed_max_id', 'Customer', 'Chemicals', NULL, NULL, '48920 San Carlos Ave', 'Los Angeles', 'CA', '30958', 'USA', NULL, '(387) 678-8606', NULL, 'www.veganinfo.co.jp', NULL, NULL, NULL, '48920 San Carlos Ave', 'Los Angeles', 'CA', '30958', 'USA', NULL, NULL, NULL);

INSERT INTO `email_addresses` (`id`, `email_address`, `email_address_caps`, `invalid_email`, `opt_out`, `confirm_opt_in`, `confirm_opt_in_date`, `confirm_opt_in_sent_date`, `confirm_opt_in_fail_date`, `confirm_opt_in_token`, `date_created`, `date_modified`, `deleted`) VALUES
('1026a917-9514-f91f-07e2-5e567b719913', 'vegan.vegan.the@example.net', 'VEGAN.VEGAN.THE@EXAMPLE.NET', 0, 0, 'not-opt-in', NULL, NULL, NULL, NULL, '2020-02-26 14:06:59', '2020-02-26 14:06:59', 0);

INSERT INTO `email_addr_bean_rel` (`id`, `email_address_id`, `bean_id`, `bean_module`, `primary_address`, `reply_to_address`, `date_created`, `date_modified`, `deleted`) VALUES
('10bda83a-1366-c97e-5568-5e567b27a35c', '1026a917-9514-f91f-07e2-5e567b719913', '11c34eba-76e0-8f0d-6f1d-5e567b77e52c', 'Accounts', 1, 0, '2020-02-26 14:06:59', '2020-02-26 14:06:59', 0);