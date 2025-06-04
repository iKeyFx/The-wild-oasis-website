"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("Please sign in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error(
      "National ID must be between 6 and 12 alphanumeric characters"
    );
  }

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  // console.log("Updating guest profile with data:", updateData);
  const { data, error } = await supabase
    .from("guest")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please sign in to delete a booking");

  const guestBookings = await getBookings(session.user.guestId);
  const getBookingIds = guestBookings.map((booking) => booking.id);

  if (!getBookingIds.includes(bookingId)) {
    throw new Error("You're not allowed to delete this booking");
  }
  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function editReservationAction(formData) {
  const session = await auth();
  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const getBookingIds = guestBookings.map((booking) => booking.id);

  if (!session) throw new Error("Please sign in to edit a booking");

  if (!getBookingIds.includes(bookingId)) {
    throw new Error("You're not allowed to edit this booking");
  }

  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };
  const { error } = await supabase
    .from("booking")
    .update(updateData)
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  redirect(`/account/reservations`);
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Please sign in to create a booking");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    extrasPrice: 0,
    hasBreakfast: false,
    isPaid: false,
  };

  const { error } = await supabase.from("booking").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
