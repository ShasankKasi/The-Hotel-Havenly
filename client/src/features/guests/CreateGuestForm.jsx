/* eslint-disable react/prop-types */

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import useCreateGuest from "./useCreateGuest";
import useEditGuest from "./useEditGuest";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createguest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();
  function onSubmit(data) {
    try {
      if (isEditSession) {
        editGuest(
          { newGuestData: data, id: editId },
          { onSuccess: () => reset() }
        );
      } else {
        createguest(data, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        });
      }
    } catch (error) {
      console.error("Error creating or editing guest:", error);
    }
  }

  const isLoading = isEditing || isCreating;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isLoading}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isLoading}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Country Flag" error={errors?.countryFlag?.message}>
        <Input
          type="text"
          id="countryFlag"
          defaultValue="https://flagcdn.com/.svg"
          disabled={isLoading}
          {...register("countryFlag", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit Guest" : "Add Guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
