import { render, screen } from "@testing-library/react";
import { PasswordReset } from "./PasswordReset";

fit("missing access token, then submit", () => {
  render(PasswordReset).tobe(6);
});

// it("loads items eventually", async () => {
//   render(<resetpassword />);
//   // Click button
//   fireEvent.click(screen.getByText("Submit"));

//   // Wait for page to update with query text
//   const items = await screen.findAllByText(/Item #[0-9]: /);
//   expect(items).toHaveLength(10);
// });
