/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSettings } from "../settings/useSettings";
import "./newBooking.css";
import { useCabinIds } from "./useCabinIds";
import Spinner from "../../ui/Spinner";
import useCreateBooking from "./useCreateBooking";
import { useEffect, useState } from "react";
import { useCheckGuests } from "./useCheckGuest";
import toast from "react-hot-toast";
import { useDarkMode } from "../../hooks/useDarkMode";

function BookingForm() {
  const { register, formState, reset, getValues, handleSubmit, watch } =
    useForm({
      defaultValues: {
        hasBreakfast: false,
      },
    });
  const { errors } = formState;
  const { isLoading: settingsLoading, settings } = useSettings();
  const {
    id,
    created_at,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { isCreating: isLoading3, createBooking } = useCreateBooking();
  const hasBreakfast = watch("hasBreakfast");
  const { isLoading: isLoading2, cabinIds, error } = useCabinIds();

  const [totalPrice, setTotalPrice] = useState(0);
  const [extrasPrice, setExtrasPrice] = useState(0);
  const { isLoading: guestsLoading, isGuestIdPresent } = useCheckGuests();

  const cabinPrice = watch("cabinPrice");
  const numGuests = watch("numGuests");
  const numNights = watch("numNights");

  useEffect(() => {
    const calculateExtrasPrice = () => {
      if (!hasBreakfast) return 0;
      return Number(numGuests) * Number(numNights) * breakfastPrice;
    };

    setExtrasPrice(calculateExtrasPrice());
  }, [numGuests, numNights, hasBreakfast, breakfastPrice]);

  useEffect(() => {
    setTotalPrice(Number(cabinPrice) + Number(extrasPrice));
  }, [cabinPrice, extrasPrice]);

  const { isDark } = useDarkMode();

  const lightModeColor = "#ffffff"; // Example light mode color
  const darkModeColor = "#333333"; // Example dark mode color

  useEffect(() => {
    const calculateExtrasPrice = () => {
      const numGuests = parseInt(getValues().numGuests) || 0;
      const numNights = parseInt(getValues().numNights) || 0;
      const pricePerGuest = breakfastPrice || 0;
      return hasBreakfast ? numGuests * numNights * pricePerGuest : 0;
    };

    const updatePrices = () => {
      const cabinRate = parseInt(getValues().cabinPrice) || 0;
      const extras = calculateExtrasPrice();
      setExtrasPrice(extras);
      setTotalPrice(cabinRate + extras);
    };

    updatePrices();
  }, [getValues, hasBreakfast, breakfastPrice]);

  function onSubmit(data) {
    const guestId = parseInt(getValues("guestId"));
    const extrasPrice = parseInt(getValues("extrasPrice")) || 0;
    const totalPrice = parseInt(getValues("cabinPrice") + extrasPrice) || 0;
    const Nights = parseInt(getValues("numNights"));
    const startDate = new Date(getValues("startDate"));
    const endDate = new Date(getValues("endDate"));
    const differenceInTime = endDate.getTime() - startDate.getTime();

    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    if (differenceInDays < 0) {
      toast.error(
        "Booking Failed ❌ \n Please check the start Date and end Date"
      );
    }

    if (Nights > differenceInDays) {
      return;
    }
    if (isGuestIdPresent(guestId)) {
      createBooking(
        {
          ...data,
          extrasPrice,
          totalPrice,
        },
        {
          onSettled: () => reset(),
        }
      );
    } else {
      toast.error(
        "There is no active guest with the provided guest ID. Please register the guest or check the guest ID you have entered."
      );
    }
  }
  function onChange(event) {
    setTotalPrice(event.target.value + extrasPrice);
  }

  const isLoading =
    isLoading2 || isLoading3 || settingsLoading || guestsLoading;
  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isLoading}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isLoading}
          {...register("endDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Number of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isLoading}
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: minBookingLength,
              message: `No. of nights should be atleast ${minBookingLength}`,
            },
            max: {
              value: maxBookingLength,
              message: `No. of nights should be atmost ${maxBookingLength} `,
            },
          })}
        />
      </FormRow>
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isLoading}
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "No. of guests should be atleast 1",
            },
            max: {
              value: maxGuestsPerBooking,
              message: `No. of guests should be atmost ${maxGuestsPerBooking} `,
            },
          })}
        />
      </FormRow>
      <FormRow label="Cabin Price ( ₹ )" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled={isLoading}
          onChange={onChange}
          {...register("cabinPrice", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow
        label="Total Price ( Cabin Price + Extras Price ) "
        error={errors?.totalPrice?.message}
      >
        <Input type="number" id="totalPrice" value={totalPrice} disabled />
      </FormRow>
      <FormRow label="Status" error={errors?.status?.message}>
        <select
          id="status"
          disabled={isLoading}
          {...register("status", { required: "This field is required" })}
          style={{
            backgroundColor: isDark ? darkModeColor : lightModeColor,
            color: isDark ? lightModeColor : darkModeColor,
          }}
        >
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked-out">Checked-out</option>
          <option value="checked-in">Checked-in</option>
        </select>
      </FormRow>
      <FormRow label="Need Breakfast" error={errors?.hasBreakfast?.message}>
        <div className="checkbox-wrapper">
          <Input
            type="checkbox"
            id="hasBreakfast"
            disabled={isLoading}
            {...register("hasBreakfast")}
          />
          <label htmlFor="hasBreakfast" className="checkbox-label">
            Include Breakfast (Price: {settings?.breakfastPrice || 0} per meal)
          </label>
        </div>
      </FormRow>
      <FormRow label="Paid ?" error={errors?.isPaid?.message}>
        <div className="checkbox-wrapper">
          <Input
            type="checkbox"
            id="isPaid"
            disabled={isLoading}
            {...register("isPaid")}
          />
          <label htmlFor="isPaid" className="checkbox-label">
            Is amount to be paid now?
          </label>
        </div>
      </FormRow>
      <FormRow
        label="Additional Description"
        error={errors?.observations?.message}
      >
        <Input
          type="text"
          id="observations"
          disabled={isLoading}
          {...register("observations")}
        />
      </FormRow>

      <FormRow
        label="Extras Price ( BreakFast Price and others ) "
        error={errors?.extrasPrice?.message}
      >
        <Input type="number" id="extrasPrice" value={extrasPrice} disabled />
      </FormRow>
      <FormRow label="Guest Id" error={errors?.guestId?.message}>
        <Input
          type="number"
          id="guestId"
          disabled={isLoading}
          {...register("guestId", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Id" error={errors?.cabinId?.message}>
        <select
          id="cabinId"
          disabled={isLoading2}
          {...register("cabinId", { required: "This field is required" })}
          style={{
            backgroundColor: isDark ? darkModeColor : lightModeColor,
            color: isDark ? lightModeColor : darkModeColor,
          }}
        >
          <option value="">Select Cabin Id</option>
          {cabinIds?.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        {isLoading2 && <SpinnerMini />}
        {error && <p>Error loading cabinIds</p>}
      </FormRow>
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Create new Booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
