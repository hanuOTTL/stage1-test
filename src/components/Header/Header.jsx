const Header = () => {
  return (
    <>
      <div className="bg-primary w-full h-[8vh] text-white px-3 py-4 text-header flex justify-between">
        <div className="flex flex-row">
          <div >
            <div className="border-r-4 border-border px-3">Stage1</div>
          </div>
          <div className="px-3">Timer</div>
        </div>

        <div>Question Mark</div>
      </div>
    </>
  );
};

export default Header;
