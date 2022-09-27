Hi my name is Gandalf and there's somethings you need to know

"You shall not pass!" - Gandalf

# Permissions
## What is a permission?

A value that is used to determine if a user can perform an action.

## Permission patterns

Permissions are defined in the following format:

`<infinityjs-service>.<action>.<resource>`

Where:

* `<infinityjs-service>` is the name of the service that the permission is for, e.g. `lucienne`, `nova`, `gandalf`, `miguel`, etc.

* `<action>` is the action that the permission is for, e.g. `create`, `read`, `update`, `delete`, etc.

* `<resource>` is the resource that the permission is for, e.g. `user`, `role`, `permission`, etc.

## Permission examples

* `lucienne.create.user`
* `lucienne.read.user`
* `lucienne.update.user`
* `lucienne.delete.user`

# Roles

## What is a role?

A role is a collection of permissions.

## Role patterns

Roles are defined in the following format:

`<infinityjs-service>.<role>`

Where:

* `<infinityjs-service>` is the name of the service that the role is for, e.g. `lucienne`, `nova`, `gandalf`, `miguel`, etc.

* `<role>` is the role that the permission is for, e.g. `admin`, `user`, `guest`, etc.

## Role examples

* `lucienne.admin`
* `lucienne.user`
* `lucienne.user-not-verified`