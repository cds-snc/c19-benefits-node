resource "azurerm_key_vault" "key_vault" {
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  name                = "${var.name}-kv"
  sku_name            = "standard"


}

data "azurerm_client_config" "current" {

}


resource "azurerm_key_vault_access_policy" "tf_identity" {
  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = "3e4e2875-0b94-477f-b948-85785551c03e"
  tenant_id    = data.azurerm_client_config.current.tenant_id
  secret_permissions = [
    "backup",
    "delete",
    "get",
    "list",
    "recover",
    "restore",
    "set"
  ]

}
resource "azurerm_key_vault_access_policy" "ap_identity" {

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = azurerm_app_service.app_service.identity.0.principal_id
  tenant_id    = azurerm_app_service.app_service.identity.0.tenant_id
  secret_permissions = [
    "get",
    "list",
  ]
  depends_on = [azurerm_app_service.app_service]
}

resource "azurerm_key_vault_access_policy" "staging_slot_identity" {

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = azurerm_app_service.non_prod.identity.0.principal_id
  tenant_id    = azurerm_app_service.non_prod.identity.0.tenant_id
  secret_permissions = [
    "get",
    "list",
  ]
  depends_on = [azurerm_app_service.non_prod]
}

resource "azurerm_key_vault_access_policy" "research_slot_identity" {

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = azurerm_app_service_slot.research.identity.0.principal_id
  tenant_id    = azurerm_app_service_slot.research.identity.0.tenant_id
  secret_permissions = [
    "get",
    "list",
  ]
  depends_on = [azurerm_app_service_slot.research]
}
resource "azurerm_key_vault_access_policy" "dev_slot_identity" {

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = azurerm_app_service_slot.dev.identity.0.principal_id
  tenant_id    = azurerm_app_service_slot.dev.identity.0.tenant_id
  secret_permissions = [
    "get",
    "list",
  ]
  depends_on = [azurerm_app_service_slot.dev]
}

resource "azurerm_key_vault_secret" "docker_password" {
  name         = "dockerpword"
  value        = azurerm_container_registry.container_registry.admin_password
  key_vault_id = azurerm_key_vault.key_vault.id
  depends_on   = [azurerm_key_vault_access_policy.tf_identity]
}

resource "azurerm_key_vault_secret" "airtable_api_key" {
  name         = "AirtableApiKey"
  value        = var.airtable_api_key
  key_vault_id = azurerm_key_vault.key_vault.id
  depends_on   = [azurerm_key_vault_access_policy.tf_identity]
}

resource "azurerm_key_vault_secret" "airtable_base_id" {
  name         = "AirtableBaseId"
  value        = var.airtable_base_id
  key_vault_id = azurerm_key_vault.key_vault.id
  depends_on   = [azurerm_key_vault_access_policy.tf_identity]
}
