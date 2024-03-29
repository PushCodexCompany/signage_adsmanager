export default {
  convertPermissionValuesToBoolean: function (data) {
    const convertedData = { permissions: {}, other_permission: {} };

    data.map((items) => {
      for (const resource in items.permissions) {
        const value = items.permissions[resource];

        const resourcePermissions = {
          view: (value & (2 ** 1)) !== 0, // Check if the "view" bit is set
          create: (value & (2 ** 2)) !== 0, // Check if the "create" bit is set
          update: (value & (2 ** 3)) !== 0, // Check if the "update" bit is set
          delete: (value & (2 ** 4)) !== 0, // Check if the "delete" bit is set
        };
        convertedData.permissions[resource] = resourcePermissions;
      }

      for (const permissions in items.other_permission) {
        const value = items.other_permission[permissions];
        convertedData.other_permission[permissions] =
          value === 1 || value === true;
      }
    });

    return convertedData;
  },
};
