"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/shadcn/Button";
import { Switch } from "@/components/ui/shadcn/Switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";

import {
  useGenerateTotpSecretQuery,
  useEnable2FaMutation,
  useDisable2FaMutation,
} from "@/graphql/generated/output";
import {
  twoFactorSchema,
  type TwoFactorFormData,
} from "@/schemas/dashboard/security/two-factor.schema";
import Image from "next/image";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/shadcn/InputOtp";

export function TwoFactorSettings() {
  const { user } = useCurrent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { data: totpData, loading: isGenerating } = useGenerateTotpSecretQuery({
    skip: !isDialogOpen,
  });

  const [enable2FA, { loading: isLoading2FA }] = useEnable2FaMutation({
    onCompleted() {
      toast.success("Two-factor authentication enabled successfully");
      setIsDialogOpen(false);
      form.reset();
    },
    onError(error) {
      toast.error(`Error enabling 2FA: ${error.message}`);
    },
  });

  const [disable2FA, { loading: isDisabling }] = useDisable2FaMutation({
    onCompleted() {
      toast.success("Two-factor authentication disabled successfully");
    },
    onError(error) {
      toast.error(`Error disabling 2FA: ${error.message}`);
    },
  });

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      setIsDialogOpen(true);
    } else {
      await disable2FA();
    }
  };

  const onSubmit = (data: TwoFactorFormData) => {
    if (!totpData?.generateTotpSecret.secret) return;

    enable2FA({
      variables: {
        data: {
          secret: totpData.generateTotpSecret.secret,
          pin: data.pin,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading="Two-Factor Authentication"
      id="two-factor"
      description="Add an extra layer of security to your account by requiring both a password and an authentication code."
    >
      <div className="p-6 pb-0 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Protect your account with TOTP two-factor authentication.
            </p>
          </div>
          <Switch
            checked={user?.userSecurity.isTwoFAEnabled}
            onCheckedChange={handleToggle2FA}
            disabled={isGenerating || isLoading2FA || isDisabling}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {totpData?.generateTotpSecret && (
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative w-64 h-64">
                      <Image
                        src={totpData.generateTotpSecret.qrcodeUrl}
                        alt="TOTP QR Code"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-lg text-muted-foreground">
                        Or enter the code below
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {totpData.generateTotpSecret.secret}
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              disabled={isLoading2FA}
                              {...field}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading2FA}
                    >
                      {isLoading2FA ? "Verifying..." : "Verify and Enable"}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </FormWrapper>
  );
}
