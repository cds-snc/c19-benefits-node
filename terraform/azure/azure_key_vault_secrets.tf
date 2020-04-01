resource "azurerm_key_vault" "key_vault" {
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  name                = "${local.nameprefix}kv"
  sku_name            = "standard"

  tags = merge(local.common_tags)

}

data "azurerm_client_config" "current" {

}

resource "azurerm_key_vault_access_policy" "tf_identity" {
  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = data.azurerm_client_config.current.object_id
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
}

resource "azurerm_key_vault_secret" "docker_password" {
  name         = "dockerpword"
  value        = azurerm_container_registry.container_registry.admin_password
  key_vault_id = azurerm_key_vault.key_vault.id
  tags         = merge(local.common_tags)
  depends_on   = [azurerm_key_vault_access_policy.tf_identity]
}

