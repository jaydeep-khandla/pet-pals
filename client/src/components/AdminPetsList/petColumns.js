export const petColumns = [
    {
      accessorKey: "_id",
      header: "Pet ID",
    },
    {
      accessorKey: "pet_name",
      header: "Pet Name",
    },
    {
      accessorKey: "pet_breeds",
      header: "Breeds",
    },
    {
      accessorKey: "is_pet_mixed_breed",
      header: "Mixed Breed",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "pet_age",
      header: "Age",
    },
    {
      accessorKey: "pet_sex",
      header: "Sex",
    },
    {
      accessorKey: "pet_size",
      header: "Size",
    },
    {
      accessorKey: "pet_description",
      header: "Description",
    },
    {
      accessorKey: "pet_primary_photo_url",
      header: "Primary Photo URL",
    },
    {
      accessorKey: "pet_primary_photo_cropped_url",
      header: "Cropped Photo URL",
    },
    {
      accessorKey: "pet_adoption_status",
      header: "Adoption Status",
    },
    {
      accessorKey: "pet_published_date",
      header: "Published Date",
      cell: info => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
    },
    {
      accessorKey: "pet_type",
      header: "Type",
    },
    {
      accessorKey: "pet_species_name",
      header: "Species",
    },
    {
      accessorKey: "pet_breed_name",
      header: "Breed",
    },
    {
      accessorKey: "pet_facebook_url",
      header: "Facebook URL",
    },
    {
      accessorKey: "pet_twitter_url",
      header: "Twitter URL",
    },
    {
      accessorKey: "pet_pinterest_url",
      header: "Pinterest URL",
    },
    {
      accessorKey: "pet_contact_email",
      header: "Contact Email",
    },
    {
      accessorKey: "location_is_map_hidden",
      header: "Map Hidden",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "location_open_to_public",
      header: "Open to Public",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "location_by_appointment_only",
      header: "By Appointment Only",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "pet_location_address_address1",
      header: "Address Line 1",
    },
    {
      accessorKey: "pet_location_address_address2",
      header: "Address Line 2",
    },
    {
      accessorKey: "pet_location_address_city",
      header: "City",
    },
    {
      accessorKey: "pet_location_address_state",
      header: "State",
    },
    {
      accessorKey: "pet_location_address_postal_code",
      header: "Postal Code",
    },
    {
      accessorKey: "pet_location_address_country",
      header: "Country",
    },
    {
      accessorKey: "pet_organization_name",
      header: "Organization",
    },
    {
      accessorKey: "pet_home_environment_attributes_good_with_children",
      header: "Good with Children",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "pet_home_environment_attributes_good_with_dogs",
      header: "Good with Dogs",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
    {
      accessorKey: "pet_home_environment_attributes_good_with_cats",
      header: "Good with Cats",
      cell: info => info.getValue() ? 'Yes' : 'No',
    },
  ];
  