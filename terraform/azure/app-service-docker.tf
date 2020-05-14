resource "azurerm_app_service_plan" "app_service_plan" {
  name                = "${var.name}-asp"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }

  tags = {
    "project-code" = "esdc-covid-19-cds"
  }
}

resource "azurerm_app_service" "app_service" {
  name                = "${var.name}-appservice"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id
  https_only          = "true"

  site_config {
    http2_enabled = true
    always_on     = true
  }

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY"  = azurerm_application_insights.covid-benefit.instrumentation_key
    "APP_SERVICE"                     = "true"
    "AIRTABLE_API_KEY"                = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault.key_vault.vault_uri}secrets/${azurerm_key_vault_secret.airtable_api_key.name}/${azurerm_key_vault_secret.airtable_api_key.version})"
    "AIRTABLE_BASE_ID"                = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault.key_vault.vault_uri}secrets/${azurerm_key_vault_secret.airtable_base_id.name}/${azurerm_key_vault_secret.airtable_base_id.version})"
    "DOCKER_ENABLE_CI"                = "true"
    "DOCKER_REGISTRY_SERVER_URL"      = "https://${azurerm_container_registry.container_registry.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.container_registry.admin_username
    #"DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.container_registry.admin_password
    "DOCKER_REGISTRY_SERVER_PASSWORD" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault.key_vault.vault_uri}secrets/${azurerm_key_vault_secret.docker_password.name}/${azurerm_key_vault_secret.docker_password.version})"
    "SLOT_NAME"                       = "default"

  }

  logs {
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 100
      }
    }
  }
}


output "default_site_hostname" {
  value = azurerm_app_service.app_service.default_site_hostname
}
