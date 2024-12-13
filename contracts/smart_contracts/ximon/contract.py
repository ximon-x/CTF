from algopy import ARC4Contract, Global, itxn, OnCompleteAction, Application
from algopy.arc4 import abimethod, UInt64, Address, abi_call


class Ximon(ARC4Contract):
    def __init__(self) -> None:
        self.access = Global.creator_address

        self.app_address = Global.current_application_address
        self.creator_address = Global.creator_address

    @abimethod
    def sum(self, a: UInt64, b: UInt64) -> UInt64:
        return UInt64(a.native + b.native)

    @abimethod
    def call_authorize(self) -> None:
        app_id = UInt64(724672968)
        abi_call(
            "authorize(address)void",
            Address(Global.creator_address),
            app_id=app_id.native,
        )

    @abimethod
    def free_opt_in(self) -> None:
        app_id = UInt64(724672968)
        prev_app = Application(724672975)

        apps: tuple[Application] = (prev_app,)

        itxn.ApplicationCall(
            app_id=app_id.native,
            apps=apps,
            on_completion=OnCompleteAction.OptIn,
            fee=0,
        )

    # Called by creator
    @abimethod
    def rekey(self) -> None:
        itxn.Payment(
            sender=Global.current_application_address,
            receiver=Global.current_application_address,
            rekey_to=self.creator_address,
            amount=0,
        ).submit()

    @abimethod
    def reverse_rekey(self) -> None:
        itxn.Payment(
            sender=Global.current_application_address,
            receiver=Global.current_application_address,
            rekey_to=Global.creator_address,
            amount=0,
        ).submit()
