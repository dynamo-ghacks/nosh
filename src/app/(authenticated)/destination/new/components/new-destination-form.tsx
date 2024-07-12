"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateDestination, createDestinationSchema } from "../schema";
import { createDestination } from "../actions/create-destination.action";
import { FormFieldWrapper } from "@/components/form/form-field-wrapper";
import { CustomInput } from "@/components/form/custom-input";
import { CustomTextarea } from "@/components/form/custom-textarea";
import { CustomTagSelect } from "@/components/form/custom-tag-select";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { SearchDestinationDrawer } from "./search-destination-drawer";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCreateDestination } from "../hooks/useCreateDestionation";
import { MapPicker } from "./map-picker";
import { useRouter } from "next/navigation";

export function NewDestinationForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const hook = useCreateDestination();
  const { view, setView, isLoaded, location, selectedPlace } = hook;
  const { control, handleSubmit, reset, setValue } = useForm<CreateDestination>(
    {
      resolver: zodResolver(createDestinationSchema),
      defaultValues: {
        name: "",
        description: "",
        address: "",
        latitude: 0,
        longitude: 0,
        tags: [],
        isVerified: false,
        image: "",
      },
    }
  );

  useEffect(() => {
    if (selectedPlace) {
      setValue("name", selectedPlace.name);
      setValue("address", selectedPlace.address);
      setValue("latitude", selectedPlace.lat);
      setValue("longitude", selectedPlace.lng);
      setValue("image", selectedPlace.image ?? "");
    }
  }, [selectedPlace]);

  const onLoad = useCallback((mapInstance: google.maps.Map | null) => {
    hook.mapRef.current = mapInstance;
  }, []);

  const _onSubmit: SubmitHandler<CreateDestination> = async (data) => {
    try {
      const result = await createDestination(data);
      reset();
      if (result.success && result?.data?.id) {
        router.replace(`/destination/${result.data.id}`);
      }
    } catch (err) {}
  };
  return (
    <div>
      {view === null && (
        <form
          onSubmit={handleSubmit(_onSubmit)}
          className="flex flex-col gap-4"
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "120px",
                borderRadius: "16px",
              }}
              center={location}
              zoom={16}
              options={{
                disableDefaultUI: true,
                mapTypeControl: false,
                streetViewControl: false,
              }}
              onClick={() => {
                setView("map");
              }}
              onLoad={onLoad}
            >
              <Marker position={location} />
            </GoogleMap>
          )}
          <TextInput
            type="text"
            placeholder="Search for a destination"
            rightIcon={HiSearch}
            className="mb-4 w-full [&_input]:border-orange-500 [&_input]:bg-orange-50 [&_svg]:text-orange-500"
            onFocus={() => {
              setView("search");
            }}
          />

          <FormFieldWrapper label="Destination Name" required>
            <CustomInput
              control={control}
              name="name"
              placeholder="Destination name"
              disabled
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Headline" required>
            <CustomInput
              control={control}
              name="headline"
              placeholder="Headline"
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Description">
            <CustomTextarea
              control={control}
              name="description"
              placeholder="Description"
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Address" required>
            <CustomInput
              control={control}
              name="address"
              placeholder="Address"
              disabled
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Tags">
            <CustomTagSelect
              selectedTags={selectedTags}
              setSelectedTags={(tags) => {
                setSelectedTags(tags);
                setValue("tags", tags);
              }}
            />
          </FormFieldWrapper>
          <button
            className="w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex flex-row gap-2 items-center"
            type="submit"
          >
            <span>Submit</span>
          </button>
        </form>
      )}

      {isLoaded && view === "map" && <MapPicker {...hook} />}

      {isLoaded && (
        <SearchDestinationDrawer
          // center={center}
          open={view === "search"}
          onClose={() => setView(null)}
          hook={hook}
        />
      )}
    </div>
  );
}
