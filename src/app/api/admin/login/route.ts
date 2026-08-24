import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { createSessionValue } from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  try {
    const result = adminLoginSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json({ error: "E-mail ou mot de passe invalide." }, { status: 400 });
    }

    const { email, password } = result.data;
    const { data: admin, error } = await supabaseServer
      .from("admin_users")
      .select("email, password, firstname, lastname")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Erreur recherche admin:", error.message);
      return NextResponse.json({ error: "Service momentanément indisponible." }, { status: 503 });
    }

    const passwordMatches = admin ? password === admin.password : false;

    if (!admin || !passwordMatches) {
      return NextResponse.json({ error: "E-mail ou mot de passe incorrect." }, { status: 401 });
    }

    const response = NextResponse.json({
      admin: { email: admin.email, firstname: admin.firstname, lastname: admin.lastname },
    });
    response.cookies.set("ggea_admin_session", createSessionValue(admin.email), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    console.error("Erreur login admin:", error);
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
